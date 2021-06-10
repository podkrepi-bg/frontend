package support_request

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

const supportDataPayload = `{
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
}`

func TestSupportData_Scan(t *testing.T) {
	// given
	jsonb := &SupportData{}

	// when
	err := jsonb.Scan(supportDataPayload)

	// then
	assert.NoError(t, err)
}

func TestSupportData_Value(t *testing.T) {
	// given
	jsonb := &SupportData{}
	_ = jsonb.Scan(supportDataPayload)

	// when
	value, err := jsonb.Value()

	// then
	assert.NoError(t, err)
	assert.JSONEqf(t, supportDataPayload, fmt.Sprintf("%v", value), "payload-differs")
}
