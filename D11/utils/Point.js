/** 
 * @param {Array} position 点的坐标
 * @param {object} service  {name,layerId}name是igserver服务的名称
 * layerId是添加要素所在的图层号
 * @param {object} doclayer  地图文档的图层
  */
const POINT_STYLE = {
    Angle: 0,
    Color: 11, //子图颜色
    Space: 0,
    SymHeight: 6,
    SymID: 31,  //子图号
    SymWidth: 6
}
class Point {
    /* 向gdb数据库添加点要素 */
    static add({
        position,
        service,
        docLayer
    }) {
        var gpoint = new Zondy.Object.GPoint(position[0], position[1]);
        var fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] });

        //样式信息
        var pointInfo = new Zondy.Object.CPointInfo(POINT_STYLE);
        //设置当前点要素的图形参数信息
        var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
            /* 1 point 2 line 3 area */
            InfoType: 1,
            PntInfo: pointInfo
        });
        /* 属性信息 */
        //设置添加点要素的属性信息        
        var attValue = [];
        //创建一个要素
        /* new ol.Feature({
            geometry,
            style
        }) */
        var feature = new Zondy.Object.Feature({
            fGeom: fGeom,
            GraphicInfo: webGraphicInfo,
            AttValue: attValue
        });
        //设置要素为点要素
        feature.setFType(1);
        /* 2、创建要素集 --source */
        //创建一个要素数据集
        var featureSet = new Zondy.Object.FeatureSet();
        //设置属性结构
        var cAttStruct = new Zondy.Object.CAttStruct({
            FldName: [],
            FldNumber: 0,
            FldType: []
        });
        featureSet.AttStruct = cAttStruct;
        //添加要素到要素数据集
        featureSet.addFeature(feature);
        /* 3、调用服务添加要素 */
        //创建一个编辑服务类
        /* 第一个参数  igserver服务的名称 第二个参数 是编辑要素所在的图层位置 */
        var editService = new Zondy.Service.EditDocFeature(service.name, service.layerId, {
            ip: "localhost",
            port: "6163"    //访问IGServer的端口号，.net版为6163，Java版为8089
        });
        //执行添加点要素功能
        editService.add(featureSet, this.onPntSuccess(docLayer));
    }
    static queryByGeom({
        position,
        service,
        callback
    }) {
        var pointObj = new Zondy.Object.Point2D(position[0], position[1]);
        //设置查询点的搜索半径
        pointObj.nearDis = 1;
        //1、初始化查询结构对象，设置查询结构包含几何信息
        var queryStruct = new Zondy.Service.QueryFeatureStruct();
        //是否包含几何图形信息
        queryStruct.IncludeGeometry = true;
        //是否包含属性信息
        queryStruct.IncludeAttribute = true;
        //是否包含图形显示参数
        queryStruct.IncludeWebGraphic = false;
        //2、指定查询规则
        var rule = new Zondy.Service.QueryFeatureRule({
            //是否将要素的可见性计算在内
            EnableDisplayCondition: false,
            //是否完全包含
            MustInside: false,
            //是否仅比较要素的外包矩形
            CompareRectOnly: false,
            //是否相交
            Intersect: true
        });
        //实例化查询参数对象
        var queryParam = new Zondy.Service.QueryParameter({
            geometry: pointObj,
            resultFormat: "json",
            struct: queryStruct,
            rule: rule
        });
        //设置查询分页号
        queryParam.pageIndex = 0;
        //设置查询要素数目
        queryParam.recordNumber = 20;

        var queryService = new Zondy.Service.QueryDocFeature(queryParam,
            service.name, service.layerId, {

        });
        //执行查询操作，querySuccess为查询回调函数
        queryService.query(this.querySuccess(callback));
    }
    static querySuccess(callback) {
        return function (result) {
            //初始化Zondy.Format.PolygonJSON类
            var format = new Zondy.Format.PolygonJSON();
            var ol_features = format.read(result);
            callback(ol_features);
        }


    }
    static onPntSuccess(docLayer) {
        return function (data) {
            if (data.succeed) {
                alert("添加点要素成功！");
                docLayer.refresh();
            } else {
                alert("添加点要素失败！");
            }
        }

    }
}