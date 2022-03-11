// add middlewares here related to actions\
const { get } = require('./actions-model')

const checkActionId = (req, res, next) =>{
    get(req.params.id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        } else {
            next({
                status: 404,
                message: `project ${req.params.id} not found`
            })
        }
    })
    .catch(next)
}

function checkActionPayload(req, res, next) {
    if (req.body.description && req.body.notes && req.body.project_id) {
        (action => {
            req.action = action
        })
        next();
    } else {
        next({
            status: 400,
            message: 'a description and notes are required'
        });
    }
}

module.exports = {
    checkActionId,
    checkActionPayload
}