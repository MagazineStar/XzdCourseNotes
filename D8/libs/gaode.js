var gaode = new ol.layer.Tile({
    title: "高德地图",
    source: new ol.source.XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
        wrapX: false,
        /* 执行地图下载,一定要加上跨域参数 */
        crossOrigin: "Anonymous"
    })
});