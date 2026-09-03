export class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    paginate(){
        let page = +this.queryString.page || 1;
        if(page < 1) page = 1;
        let skip = (page - 1) * 5;
        this.page = page;
        this.mongooseQuery.skip(skip).limit(5);
        return this;
    }

    filter(){
        let filterObj = { ...this.queryString }
        let excludedFields = ['page', 'sort', 'fields', 'keyword'];
        excludedFields.forEach(field => delete filterObj[field]);
        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/\b(gt|gte|lt|lte|eq)\b/g, match => `$${match}`);
        filterObj = JSON.parse(filterObj);
        this.mongooseQuery.find(filterObj);
        return this;
    }

    sort(){
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortBy);
        }
        return this;
    }

    search(){
        if (this.queryString.keyword) {
            let keyword = this.queryString.keyword;
            this.mongooseQuery.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { slug: { $regex: keyword, $options: 'i' } }
                ]
            });
        }
        return this;
    }

    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(fields);
        }
        return this;
    }
}
