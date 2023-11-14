import { useCustomerOrder } from '~/composables/useCustomerOrder/useCustomerOrder';


vi.mock('~/sdk', () => ({
  useSdk: () => ({
    plentysystems: {
      getOrder: vi.fn(() => ({
        data: {test: 'nice'}
      })),
    },
  }),
}));

describe.only('useCustomerOrder', () => {
  it.only('should return customer order data', async () => {
    const { fetchOrder, data } = useCustomerOrder('1');

    await fetchOrder({
      orderId: '1',
    });

    expect(data.value).not.toBeUndefined();
  });
});
