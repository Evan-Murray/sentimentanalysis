from flask import Flask, render_template, request, jsonify, Response, json
from analyze import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def process():
    keyword = request.form['keyword']
    if keyword:
        data = gatherSentiment(keyword)

        response = Response(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )

        return response

    return jsonify({'error' : "Missing data. Ensure youve entered a valid search term."})

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=5000, debug=True)
