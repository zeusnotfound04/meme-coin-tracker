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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const getTweets_1 = require("./getTweets");
dotenv_1.default.config();
function main(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newTweets = yield (0, getTweets_1.getTweets)(userId);
        console.log(newTweets);
        // for (const tweet of newTweets){
        //     const tokenAddress = await getTokenFromLLM(tweet.description);
        //     if(tokenAddress){
        //         const txn = await createSwapInstruction();
        //         for (let i = 0 ; i < SPAM_COUNT ; i++){
        //             sendTxn(txn);
        //         }
        //     }
        // }
    });
}
main("44196397");
