
import Vue from 'vue'

Vue.filter('digit', function (x) {
    if (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    else return x
});

Vue.filter('k', function (val) {
    return `${val}k`;
});