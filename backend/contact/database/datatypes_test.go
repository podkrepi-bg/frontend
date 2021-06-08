package database_test

import (
	"fmt"
	"github.com/daritelska-platforma/v2/routes/support_request"
	"github.com/stretchr/testify/assert"
	"testing"
)

const payload = `{
	"person": {
		"email": "test@example.com",
		"name": "John Doe",
		"phone": "+35983333333333",
		"comment": "test",
		"terms": true,
		"gdpr": true,
		"newsletter": true
	},
	"support_data": {
		"roles": {
			"benefactor": false,
			"partner": false,
			"associationMember": true,
			"company": false,
			"volunteer": false
		},
		"benefactor": {
			"campaignBenefactor": false,
			"platformBenefactor": false
		},
		"partner": {
			"npo": false,
			"bussiness": false,
			"other": false,
			"otherText": ""
		},
		"volunteer": {
			"backend": false,
			"frontend": false,
			"marketing": false,
			"designer": false,
			"projectManager": false,
			"devOps": false,
			"security": false,
			"financesAndAccounts": false,
			"lawyer": false,
			"qa": false
		},
		"associationMember": {
			"isMember": true
		},
		"company": {
			"sponsor": false,
			"volunteer": false,
			"other": false,
			"otherText": ""
		}
	}
}`

func TestPerson_Scan(t *testing.T) {
	t.Run("should unmarshal payload successfully", func(t *testing.T) {
		// given
		jsonb := &Person{}

		// when
		err := jsonb.Scan(payload)

		// then
		assert.NoError(t, err)
	})
}

func TestJSONB_Value(t *testing.T) {
	t.Run("should marshall successfully", func(t *testing.T) {
		// given
		jsonb := &database.JSONB{}
		_ = jsonb.Scan(payload)

		// when
		value, err := jsonb.Value()

		// then
		assert.NoError(t, err)
		assert.JSONEqf(t, payload, fmt.Sprintf("%v", value), "payload-differs")
	})
}
