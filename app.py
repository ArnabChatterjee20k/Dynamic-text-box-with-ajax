from flask import Flask , request 
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db=SQLAlchemy(app)
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.Text,nullable=False,server_default="Nothing present")
@app.route('/',methods=['GET', 'POST'])
def hello():
    if request.method=="POST":
        check=request.is_json
        if check:
            data=request.json
            query = Note.query.first()
            if query:
                query.note=data["notes"]
                db.session.commit()
            else:
                entry = Note(note=data["notes"])
                db.session.add(entry)
                db.session.commit()
            return "done"
        else:
            return "Plz send json object"
    data = Note.query.all()
    if data:
        return data[-1].note
    else:
        return "Nothing present"
    

if __name__ == '__main__':
    app.run(debug=True,port=80)