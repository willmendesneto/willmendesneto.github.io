import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "*": {
        "WebkitBoxSizing": "border-box",
        "MozBoxSizing": "border-box",
        "boxSizing": "border-box"
    },
    "html": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0
    },
    "body": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "fontFamily": "\"Merriweather\",serif",
        "fontSize": 22,
        "lineHeight": 2,
        "color": "#515151",
        "backgroundColor": "#fff",
        "WebkitTextSizeAdjust": "100%",
        "MsTextSizeAdjust": "100%"
    },
    "a": {
        "color": "#6c6666",
        "textDecoration": "underline",
        "fontWeight": "bold",
        "WebkitTransition": "color 0.2s ease-in-out",
        "MozTransition": "color 0.2s ease-in-out",
        "OTransition": "color 0.2s ease-in-out",
        "transition": "color 0.2s ease-in-out"
    },
    "a:hover": {
        "color": "#009999"
    },
    "a:focus": {
        "color": "#009999"
    },
    "a strong": {
        "color": "inherit"
    },
    "img": {
        "display": "block",
        "maxWidth": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 1,
        "marginLeft": 0,
        "borderRadius": 5
    },
    "ul": {
        "marginLeft": 0,
        "marginTop": 0,
        "marginBottom": 1
    },
    "ul li": {
        "listStyle": "none",
        "textAlign": "left"
    },
    "hidden-text": {
        "textIndent": -1000 * vh,
        "height": 0
    },
    "content-section": {
        "marginBottom": 4
    },
    "project-item h3": {
        "fontSize": 18
    },
    "project-item p": {
        "fontSize": 18,
        "color": "#8e8e8e"
    },
    "content-section p": {
        "lineHeight": 2
    },
    "h1": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "fontSize": 2
    },
    "h2": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "marginTop": 1,
        "fontSize": 1.5
    },
    "h3": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "marginTop": 1.5,
        "fontSize": 1.25
    },
    "h4": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "marginTop": 1,
        "fontSize": 1
    },
    "h5": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "marginTop": 1,
        "fontSize": 1
    },
    "h6": {
        "marginBottom": 0.5,
        "fontWeight": "600",
        "lineHeight": 1.25,
        "color": "#4b4040",
        "textRendering": "optimizeLegibility",
        "marginTop": 1,
        "fontSize": 1
    },
    "p": {
        "color": "#6c6666",
        "marginTop": 0,
        "marginBottom": 1
    },
    "strong": {
        "color": "#6c6666"
    },
    "ol": {
        "marginTop": 0,
        "marginBottom": 1
    },
    "hr": {
        "position": "relative",
        "marginTop": 1.5,
        "marginRight": 0,
        "marginBottom": 1.5,
        "marginLeft": 0,
        "border": 0,
        "borderTop": "1px solid #eee",
        "borderBottom": "1px solid #fff"
    },
    "abbr": {
        "fontSize": "85%",
        "fontWeight": "bold",
        "color": "#555",
        "textTransform": "uppercase"
    },
    "abbr[title]": {
        "cursor": "help",
        "borderBottom": "1px dotted #e5e5e5"
    },
    "social li": {
        "marginBottom": 0.75
    },
    "social i": {
        "fontSize": 28
    },
    "footer": {
        "marginTop": 4,
        "marginRight": 0,
        "marginBottom": 4,
        "marginLeft": 0
    },
    "footer h2": {
        "marginBottom": 1,
        "fontSize": 22
    },
    "footer p": {
        "fontSize": 18
    },
    "footer copyright": {
        "marginTop": 4,
        "color": "#d1d1d1"
    },
    "profile-header": {
        "paddingTop": 1,
        "paddingRight": 0,
        "paddingBottom": 1,
        "paddingLeft": 0,
        "marginTop": 3,
        "marginRight": 0,
        "marginBottom": 3,
        "marginLeft": 0
    },
    "profile-header img": {
        "width": 300,
        "borderRadius": "50%",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "display": "table",
        "boxShadow": "0 1px 7px"
    },
    "main h2": {
        "fontSize": 22,
        "marginBottom": 2
    }
});