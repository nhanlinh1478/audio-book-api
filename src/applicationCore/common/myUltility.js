const { cloudinary } = require('../../webAPI/utils/cloundinary');

function validURL(str) {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(str);
}

async function cloudinaryUploader(file, type = 'video') {
    //type = video || image
    const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: type,
    });
    return uploadResponse.url;
}

function loggingEvent(
    object,
    action,
    entity,
    status = true,
    find = null,
    createdBy = null,
    message = '',
    create = null,
) {
    if (object && typeof object.log === 'function') {
        const data = {
            action,
            entity,
            status,
            find,
            createdBy,
            message,
            create,
        };
        object.log(data);
    }
    return;
}
module.exports = {
    validURL,
    cloudinaryUploader,
    loggingEvent,
};
