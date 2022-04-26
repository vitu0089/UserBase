"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = void 0;
const node_json_db_1 = require("node-json-db");
let DatabaseLocation = "./Databases/";
class UserHandler {
    constructor(Username, HasHealth) {
        this.db = new node_json_db_1.JsonDB(DatabaseLocation + Username);
    }
    create(item_name, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.db.find(item_name, (entry, index) => { return true; })) == undefined) {
                this.db.push("/" + item_name, value, true);
                return true;
            }
            else {
                return false;
            }
        });
    }
    get(item_name) {
        if (item_name) {
            return this.db.getData("/" + item_name);
        }
        else {
            return this.db.getData("/");
        }
    }
    set(item_name, value) {
        this.db.push("/" + item_name, value);
        this.db.save();
    }
    increment(item_name, value) {
        if (typeof this.get(item_name) != "number") {
            console.warn("Can't increment non-numerical values");
            return false;
        }
        this.db.push("/" + item_name, value + this.get(item_name));
    }
}
exports.UserHandler = UserHandler;
