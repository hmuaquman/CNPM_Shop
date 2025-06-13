const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return price;
    }
    return price.toLocaleString('vi-VN') + '₫';
};

module.exports = {
    formatPrice
};
