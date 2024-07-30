import { AddressType, cartGetters, userAddressGetters } from "@plentymarkets/shop-api";

export const useCheckoutPageAddresses = () => {
    const { onCreate: onShippingCreate, onSet: onSetShipping, unsubscribeAll, get: getShipping } = useAddressStore(AddressType.Shipping);
    const { onCreate: onBillingCreate, onSet: onSetBilling, get: getBilling } = useAddressStore(AddressType.Billing);
    const { data: cart } = useCart();

    onNuxtReady(async () => {
        const { fetchServer: fetchShipping } = useFetchAdddress(AddressType.Shipping);
        fetchShipping();
        const { fetchServer: fetchBilling } = useFetchAdddress(AddressType.Billing);
        fetchBilling();
    });

    /* const unsubscribeShippingUpdate = onShippingUpdate((event) => {
        const { set: setCheckoutAddress } = useCheckoutAddress(AddressType.Shipping);
        setCheckoutAddress(event.payload);
    }); */

    onSetShipping((event) => {
        const { set: setCheckoutAddress } = useCheckoutAddress(AddressType.Shipping);
        const cartShippingAddressId = cartGetters.getCustomerShippingAddressId(cart.value);
        const primaryAddress = userAddressGetters.getDefault(event.payload);

        if (event.payload[0]) {
            const address = ref(event.payload[0]);
            const cartAddress = ref();

            if (cartShippingAddressId) {
                cartAddress.value = getShipping(cartShippingAddressId);
            }

            address.value = cartAddress.value ?? primaryAddress ?? event.payload[0];
            setCheckoutAddress(address.value, true);
        }
    });

    onSetBilling((event) => {
        const { set: setCheckoutAddress } = useCheckoutAddress(AddressType.Billing);
        const cartBillingAddressId = cartGetters.getCustomerInvoiceAddressId(cart.value);
        const primaryAddress = userAddressGetters.getDefault(event.payload);

        if (event.payload[0]) {
            const address = ref(event.payload[0]);
            const cartAddress = ref();

            if (cartBillingAddressId) {
                cartAddress.value = getBilling(cartBillingAddressId);
            }

            address.value = cartAddress.value ?? primaryAddress ?? event.payload[0];
            setCheckoutAddress(address.value, true);
        }

    });

    onShippingCreate((event) => {
        const { set: setCheckoutAddress } = useCheckoutAddress(AddressType.Shipping);
        setCheckoutAddress(event.payload[0]);
    });

    onBillingCreate((event) => {
        const { set: setCheckoutAddress } = useCheckoutAddress(AddressType.Billing);
        setCheckoutAddress(event.payload[0]);
    });

    onUnmounted(() => {
        unsubscribeAll();
    });
};