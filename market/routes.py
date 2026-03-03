import os
from market import db, app
from market.models import Item, User
from market.forms import RegisterForm, LoginForm, PurchaseItemForm, SellItemForm
from flask import render_template, redirect, url_for, flash, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user


@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')


@app.route('/market', methods=['GET', 'POST'])
@login_required
def market_page():
    purchase_form = PurchaseItemForm()
    selling_form = SellItemForm()
    if request.method == "POST":
        #Purchase Item Logic
        purchased_item = request.form.get('purchased_item')
        p_item_object = Item.query.filter_by(name=purchased_item).first()
        if p_item_object:
            if current_user.can_purchase(p_item_object):
                p_item_object.buy(current_user)
                flash(f"Congratulations! You purchased {p_item_object.name} for {p_item_object.price}$", category='success')
            else:
                flash(f"Unfortunately, you don't have enough money to purchase {p_item_object.name}!", category='danger')
        #Sell Item Logic
        sold_item = request.form.get('sold_item')
        s_item_object = Item.query.filter_by(name=sold_item).first()
        if s_item_object:
            if current_user.can_sell(s_item_object):
                s_item_object.sell(current_user)
                flash(f"Congratulations! You sold {s_item_object.name} back to market!", category='success')
            else:
                flash(f"Something went wrong with selling {s_item_object.name}", category='danger')


        return redirect(url_for('market_page'))

    if request.method == "GET":
        items = Item.query.filter_by(owner=None)
        owned_items = Item.query.filter_by(owner=current_user.id)
        return render_template('market.html', items=items, purchase_form=purchase_form, owned_items=owned_items, selling_form=selling_form)


@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if form.validate_on_submit():
        # Save image
        file_data = form.profile_pic.data
        filename = file_data.filename
        file_data.save(os.path.join(app.config['UPLOAD_FOLDER'], file_data.filename))

        flash(f'File "{filename}" uploaded successfully!')
        user_to_create = User(
            username=form.username.data,
            email_address=form.email_address.data,
            password=form.password1.data,
            profile_pic=filename
        )
        db.session.add(user_to_create)
        db.session.commit()
        login_user(user_to_create)
        flash(f"Account created successfully! You are now logged in as {user_to_create.username}", category='success')
        return redirect(url_for('market_page'))
    if form.errors != {}: # If there are not errors from the validations
        for err_msg in form.errors.values():
            flash(f'There was an error with creating a user: {err_msg}', category='danger')

    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = User.query.filter_by(username=form.username.data).first()
        if attempted_user and attempted_user.check_password_correction(
                attempted_password=form.password.data
        ):
            login_user(attempted_user)
            flash(f'Success! You are logged in as: {attempted_user.username}', category='success')
            return redirect(url_for('market_page'))
        else:
            flash('Username and password are not match! Please try again', category='danger')

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))


@app.route('/people')
def people():
    data = {
        'firstname': 'Ozcan',
        'lastname': 'Yarimdunya',
        'age': 24,
        'companies': [
            'Ankaway Companies Group',
            'Huawei Technologies'
        ]
    }
    return jsonify(data)


@app.route('/companies')
def companies_page():
    return render_template('companies.html')


@app.route("/submit", methods=["POST"])
def submit():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    message = request.form.get("message", "").strip()

    errors = []
    if not name:
        errors.append("Name is required.")
    if not email or "@" not in email:
        errors.append("A valid email is required.")
    if not message:
        errors.append("Message is required.")

    if errors:
        # Return JSON for AJAX, or redirect for plain form POST
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return jsonify({"success": False, "errors": errors}), 400
        for e in errors:
            flash(e, "error")
        return redirect(url_for("index"))

    submissions.append({"name": name, "email": email, "message": message})

    if request.headers.get("X-Requested-With") == "XMLHttpRequest":
        return jsonify({"success": True, "message": f"Thanks, {name}! We'll be in touch."})

    flash(f"Thanks, {name}! Your message was received.", "success")
    return redirect(url_for("index"))

