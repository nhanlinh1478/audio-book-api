class ServiceResult {
    constructor(success = false, message = '', data = {}, code = 200) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.code = code;
    }
}

module.exports = ServiceResult;
