/**
 * 专题页面
 * Created by LiYun on 2016/8/12.
 */
var Special = (function () {
    function setContents(parent) {
        var $contentsContainer = $("<div class='contents-container'>" +
            "<div class='content-top'></div>" +
            "<div class='content-others'></div>" +
            "</div>");
        var topTpl="<a target='_blank' href='{{link}}'><h2>{{title}}</h2><div class='desc'>{{desc}}</div><div class='img'><div class='img-desc'>主编推荐</div><img width='800' src='{{imgUrl}}' alt=''/></div><div class='bottom'><span class='author'>{{author}}</span>·<span class='time'>{{time}}</span><span class='tags'>{{tags}}</span></div></a>";

        //请求观点专题的JSON数据
        $.get("json/guandian.json", function (res) {
            var datas = eval(res);//解析成对象数组
            $.each(datas, function (i, data) {
                if (i === 0) {
                    $contentsContainer.find(".content-top").append(topTpl.replace("{{link}}",data.link).replace("{{title}}",data.title).replace("{{desc}}",data.desc).replace("{{imgUrl}}",data.imgUrl).replace("{{author}}",data.author).replace("{{time}}",new Date(data.time).toLocaleTimeString()).replace("{{tags}}",data.tags.toString()));
                } else {
                    $contentsContainer.find(".content-others").append("<a target='_blank' href='" + data.link + "'><img width='250' height='166' src='" + data.imgUrl + "' alt=''><h3>" + data.title + "</h3><div class='bottom'><span class='author'>" + data.author + "</span>·<span class='time'>" + new Date(data.time).toLocaleTimeString() + "</span></div>" +
                        "<div class='desc'>" + data.desc + "</div>" +
                        "<div class='tags'>" + data.tags.toString() + "</div>" +
                        "</a>");
                }
            });

        });
        //将内容区添加到大容器里面去
        $contentsContainer.appendTo(parent);
    }

    //设置热门标签
    function setTags(parent) {
        var tag = new Tag(parent);
    }

    //设置热门文章
    function setHotArticles(parent) {
        var hotArticle = new HotArticle(parent)
    }


    function Special(opts) {
        //初始化：初始化dom操作，初始化事件绑定
        this.init(opts);

    }

    Special.prototype = {
        constructor: Special,
        //页面初始化
        init: function (opts) {
            if (!opts || !opts.parent) $.error("请提供父容器");

            var $container = $("<div class='special-container'></div>").appendTo(opts.parent);
            //设置内容
            setContents($container);
            //设置热门标签
            setTags($container);
            //设置热门文章
            setHotArticles($container);
            //设置页面容器
            this.container = $container;
        }
    };
    return Special;
}());