package support_request

import (
	"fmt"
	"testing"

	//. "github.com/daritelska-platforma/v2/contact/routes/support_request"

	"github.com/stretchr/testify/assert"
)

var payload_person = `{
	"address": "",
	"comment": "test",
	"email": "test@example.com",
	"gdpr": true,
	"name": "John Doe",
	"newsletter": true,
	"phone": "+35983333333333",
	"terms": true
}`

// var payload_support_data = `{
// 	"support_data": {
// 		"roles": {
// 			"benefactor": true,
// 			"partner": false,
// 			"associationMember": true,
// 			"company": false,
// 			"volunteer": false
// 		},
// 		"benefactor": {
// 			"campaignBenefactor": false,
// 			"platformBenefactor": false
// 		},
// 		"partner": {
// 			"npo": false,
// 			"bussiness": false,
// 			"other": false,
// 			"otherText": ""
// 		},
// 		"volunteer": {
// 			"backend": false,
// 			"frontend": false,
// 			"marketing": false,
// 			"designer": false,
// 			"projectManager": false,
// 			"devOps": false,
// 			"security": false,
// 			"financesAndAccounts": false,
// 			"lawyer": false,
// 			"qa": false
// 		},
// 		"associationMember": {
// 			"isMember": true
// 		},
// 		"company": {
// 			"sponsor": false,
// 			"volunteer": false,
// 			"other": false,
// 			"otherText": ""
// 		}
// 	}
// }`

func TestPerson_Scan(t *testing.T) {
	t.Run("should unmarshal payload successfully", func(t *testing.T) {
		// given
		jsonb := &Person{}

		// when
		textBytes := []byte(payload_person)
		err := jsonb.Scan(textBytes)

		// then
		assert.NoError(t, err)
	})
}

func TestPerson_Value(t *testing.T) {
	t.Run("should marshall successfully", func(t *testing.T) {
		// given
		jsonb := &Person{}
		textBytes := []byte(payload_person)
		_ = jsonb.Scan(textBytes)

		// when
		value, err := jsonb.Value()

		// then
		assert.NoError(t, err)
		assert.JSONEqf(t, payload_person, fmt.Sprintf("%v", value), "payload-differs")
	})
}
