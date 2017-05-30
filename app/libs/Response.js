class Response {
    setMessage(message) { this._message = message;  }

    setData(data) { this._data = data; }

    render() {
        return {
            message: this._message,
            data: this._data
        }
    }
}

module.exports = Response;