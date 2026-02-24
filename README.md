py -m venv .venv

.venv/Scripts/activate

pip install -r requirements.txt

flask --app run.py --debug run
