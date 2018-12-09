const BookSchema = require('../models/book.model');
const ErrorHandler = require('../helpers/errors.helper');

const getEbookById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
        const book = await BookSchema.findOne({ _id: id }).exec();
        if (!book) {
            res.status(403).send({
                success: false,
                msg: `Book with this id doesn't exists`
            });
            return;
        }
        console.log(book);
        res.setHeader('Content-Type', book.file.mimetype);
        const file = fs.createReadStream(book.file.destination);
        await file.pipe(res);

        res.status(200).send({
            success: true,
            msg: 'Successfuly downloaded ebook'
        });

    } catch (error) {
        console.error('[ERROR] Reading: Error occured while streaming ebook file');
        ErrorHandler.throwError(res, error);
    }
    console.log('[SUCCESS] Reading: Successfuly downloaded streaming ebook file');
}


module.exports = { getEbookById };