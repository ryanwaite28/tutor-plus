"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
exports.APP_SECRET = 'f6evg7h8j9rrnhcw8e76@$#%RFG&*BF^&G*O(Pxjt678yu';
exports.specialCaracters = ['!', '@', '#', '$', '%', '&', '+', ')', ']', '}', ':', ';', '?'];
exports.allowed_images = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
exports.static_dir = path.resolve(__dirname, '../static');
exports.img_dir = path.join(exports.static_dir, 'img/');
exports.css_dir = path.join(exports.static_dir, 'css/');
exports.html_dir = path.join(exports.static_dir, 'html/');
exports.paths = {
    static: exports.static_dir,
    img: exports.img_dir,
    css: exports.css_dir,
    html: exports.html_dir,
};
exports.pages = {
    _error: 'error.html',
    welcome: 'welcome.html',
    signup: 'signup.html',
    signin: 'signin.html',
};
var Event_Types;
(function (Event_Types) {
    Event_Types["LIKE"] = "LIKE";
})(Event_Types = exports.Event_Types || (exports.Event_Types = {}));
var Notification_Target_Types;
(function (Notification_Target_Types) {
    Notification_Target_Types["USER"] = "USER";
})(Notification_Target_Types = exports.Notification_Target_Types || (exports.Notification_Target_Types = {}));
var Content_Types;
(function (Content_Types) {
    Content_Types["LIVE_SESSION"] = "LIVE_SESSION";
    Content_Types["TUTORIAL"] = "TUTORIAL";
})(Content_Types = exports.Content_Types || (exports.Content_Types = {}));
function addDays(dateObj, number_of_days) {
    const dat = new Date(dateObj.valueOf());
    dat.setDate(dat.getDate() + number_of_days);
    return dat;
}
exports.addDays = addDays;
function backDays(dateObj, number_of_days) {
    const dat = new Date(dateObj.valueOf());
    dat.setDate(dat.getDate() - number_of_days);
    return dat;
}
exports.backDays = backDays;
function validateEmail(email) {
    if (!email) {
        return false;
    }
    if (email.constructor !== String) {
        return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
exports.validateEmail = validateEmail;
function validateName(name) {
    if (!name) {
        return false;
    }
    if (name.constructor !== String) {
        return false;
    }
    const re = /^[a-zA-Z]{2,50}$/;
    return re.test(name.toLowerCase());
}
exports.validateName = validateName;
function validateDisplayName(value) {
    if (!value) {
        return false;
    }
    if (value.constructor !== String) {
        return false;
    }
    const re = /^[a-zA-Z\s\'\-\_\.]{2,50}$/;
    return re.test(value.toLowerCase());
}
exports.validateDisplayName = validateDisplayName;
function validateUsername(value) {
    if (!value) {
        return false;
    }
    if (value.constructor !== String) {
        return false;
    }
    const re = /^[a-zA-Z0-9\-\_]{2,50}$/;
    return re.test(value.toLowerCase());
}
exports.validateUsername = validateUsername;
function validateURL(value) {
    if (!value) {
        return false;
    }
    if (value.constructor !== String) {
        return false;
    }
    const re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return re.test(value.toLowerCase());
}
exports.validateURL = validateURL;
function validateInteger(value) {
    if (!value) {
        return false;
    }
    if (value.constructor !== Number) {
        return false;
    }
    const re = /^[0-9]+$/;
    return re.test(value);
}
exports.validateInteger = validateInteger;
function validatePassword(password) {
    if (!password) {
        return false;
    }
    if (password.constructor !== String) {
        return false;
    }
    const hasMoreThanSixCharacters = password.length > 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    return (hasMoreThanSixCharacters
        && (hasUpperCase || hasLowerCase)
        && hasNumbers);
}
exports.validatePassword = validatePassword;
function uniqueValue() {
    return String(Date.now()) +
        Math.random().toString(36).substr(2, 34) +
        Math.random().toString(36).substr(2, 34) +
        Math.random().toString(36).substr(2, 34) +
        Math.random().toString(36).substr(2, 34);
}
exports.uniqueValue = uniqueValue;
function capitalize(str) {
    const Str = str.toLowerCase();
    return Str.charAt(0).toUpperCase() + Str.slice(1);
}
exports.capitalize = capitalize;
function getRandomIndex(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomIndex = getRandomIndex;
function generateRandomString(num = 1) {
    let str = '';
    if (typeof (num) !== 'number') {
        num = 1;
    }
    for (let i = 0; i < num; i++) {
        str = str + Math.random().toString(36).substr(2, 34);
    }
    return str;
}
exports.generateRandomString = generateRandomString;
function generateRandomSpecialString(num = 1) {
    let str = '';
    if (typeof (num) !== 'number') {
        num = 1;
    }
    for (let i = 0; i < num; i++) {
        str = str + Math.random().toString(36).substr(2, 34) + getRandomIndex(exports.specialCaracters);
    }
    return str;
}
exports.generateRandomSpecialString = generateRandomSpecialString;
function PageSessionRequired(request, response, next) {
    console.log('auth called');
    (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!request.session.id) {
            return response.status(401).json({
                error: true,
                message: 'Not signed in'
            });
        }
        else {
            return next();
        }
    }))();
}
exports.PageSessionRequired = PageSessionRequired;
function GetSessionRequired(request, response, next) {
    console.log('auth called');
    (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!request.session.id) {
            return response.render(exports.pages.error, {});
        }
        else {
            return next();
        }
    }))();
}
exports.GetSessionRequired = GetSessionRequired;
exports.whitelist_domains = [
    'http://localhost:7600',
    'http://localhost:9500',
    '',
];
exports.corsOptions = {
    origin(origin, callback) {
        const originIsAllowed = exports.whitelist_domains.includes(origin);
        console.log({
            origin,
            originIsAllowed,
        });
        if (!origin) {
            callback(new Error('Not allowed by CORS'));
            return;
        }
        if (originIsAllowed) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
