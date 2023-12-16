const _ = require('lodash')
module.exports = {
	selectFields: (obj, fieldsToSelect) => {
		return _.pick(obj, fieldsToSelect)
	},
	unselectFields: (obj, fieldsToUnselect) => {
		return _.omit(JSON.parse(JSON.stringify(obj)), fieldsToUnselect)
	},
}
