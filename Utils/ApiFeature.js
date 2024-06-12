class ApiFeature{
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
     filter() {
        let querySt = JSON.stringify(this.queryStr);
        querySt = querySt.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const queryObj = JSON.parse(querySt);
        this.query = this.query.find(queryObj);  // Corrected to use find() method on query
        return this;
    }
      sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        // console.log(this);
        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
     
        // if (this.queryStr.page) {
        //     const movieCount = await this.query.countDocuments();
        // }
        return this;

    }
    
}
module.exports = ApiFeature;