const getALL = (model, query) => {
    return new Promise(async (res, rej) => {
        try {
            let getData = await model.find(query).lean()
            if (getData) {
                return res(getData)
            } else {
                return res([])
            }
        } catch (e) {
            console.log("========================" + e)
            return res([])
        }
    })

}
const getDataByID = (model, query) => {
    return new Promise(async (res, rej) => {
        try {
            let getData = await model.findOne(query)
            if (getData) {
                return res(getData)
            } else {
                return res({})
            }
        } catch (e) {
            console.log("========================" + e)
            return res({})
        }
    })

}
const updateById = (model, uniqeId, setObj) => {
    return new Promise(async (res, rej) => {
        try {
            let getData = await model.update(uniqeId, setObj)
            if (getData) {
                return res(getData)
            } else {
                return res({})
            }
        } catch (e) {
            console.log("========================" + e)
            return res({})
        }
    })

}

const insertDocument = (model, data) => {
    return new Promise(async (res, rej) => {
        try {
            let insertUser = await model.insertMany(data)
            if (insertUser) {
                return res(insertUser)
            } else {
                return res({})
            }
        } catch (e) {
            console.log("===================+ in insertDocument" + e)
            return res({})
        }

    })
}
module.exports = {
    FIND_ALL: getALL,
    GET_BY_ID: getDataByID,
    UPDATE_BY_ID: updateById,
    INSERT_ONE: insertDocument
}