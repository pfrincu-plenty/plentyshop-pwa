import OrderProperties from '~/components/OrderProperties/OrderProperties.vue';
import { mount } from '@vue/test-utils';
import { product } from './OrderProperties.unit.test.mock';

const orderPropertyTypeSelection = {
    "propertySelectionId": null,
    "propertySelection": [],
    "propertyId": 36,
    "surcharge": 0,
    "group": {
        "id": 4,
        "names": {
            "lang": "en",
            "name": "Order properties",
            "description": "",
            "id": 10,
            "groupId": 4,
        },
        "backendName": "",
        "orderPropertyGroupingType": "none",
        "isSurchargePercental": false
    },
    "property": {
        "id": 36,
        "position": 0,
        "valueType": "selection",
        "isOderProperty": true,
        "isShownAsAdditionalCosts": false,
        "isRequired": true,
        "isPreSelected": true,
        "isShownOnItemPage": true,
        "isShownOnItemList": true,
        "isShownAtCheckout": true,
        "surcharge": 0,
        "vatId": null,
        "names": {
            "lang": "en",
            "name": "Order prop selection EN",
            "description": "Selection description EN",
            "propertyId": "36"
        },
        "selectionValues": {
            "11": {
                "id": 11,
                "name": "Select 1 EN",
                "description": ""
            },
            "12": {
                "id": 12,
                "name": "Select 2 EN",
                "description": ""
            },
            "13": {
                "id": 13,
                "name": "Select 3 EN",
                "description": ""
            }
        },
    }
}

product.properties = [orderPropertyTypeSelection];

describe('<OrderProperties />', () => {
  it('should render component', () => {
    const wrapper = mount(OrderProperties, {
      props: {
        product: product
      },
    });


    const select = wrapper.getByTestId('order-properties-select');

    expect(select);

    console.log(select);

    expect(wrapper.getByTestId('order-properties'));
  });
});
