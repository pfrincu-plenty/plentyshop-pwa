import OrderProperties from '~/components/OrderProperties/OrderProperties.vue';
import { Product } from '@plentymarkets/shop-api';
import { mount } from '@vue/test-utils';
import { product } from './OrderProperties.unit.test.mock';

describe('<OrderProperties />', () => {
  it('should render component', () => {
    const wrapper = mount(OrderProperties, {
      props: {
        product: product as Product
      },
    });

    expect(wrapper.getByTestId('order-properties'));
  });
});
