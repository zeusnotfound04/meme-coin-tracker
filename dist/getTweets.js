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
exports.getTweets = getTweets;
const axios_1 = __importDefault(require("axios"));
const TweetMaxTimeMS = 60 * 1000; // 1 minute
function getTweets(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://twitter241.p.rapidapi.com/user-tweets?user=${userId}&count=20`,
            headers: {
                'x-rapidapi-host': 'twitter241.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY
            }
        };
        const tweets = [];
        try {
            const response = yield axios_1.default.request(config);
            const instructions = (_b = (_a = response.data.result) === null || _a === void 0 ? void 0 : _a.timeline) === null || _b === void 0 ? void 0 : _b.instructions;
            if (!instructions || !Array.isArray(instructions)) {
                console.error("Invalid response: instructions not found");
                return [];
            }
            instructions.forEach((instruction) => {
                if (instruction.entries) {
                    instruction.entries.forEach((entry) => {
                        var _a, _b, _c, _d;
                        const tweet = (_d = (_c = (_b = (_a = entry.content) === null || _a === void 0 ? void 0 : _a.itemContent) === null || _b === void 0 ? void 0 : _b.tweet_results) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d.legacy;
                        if (tweet) {
                            tweets.push({
                                id: tweet.id_str,
                                content: tweet.full_text,
                                createdAt: tweet.created_at,
                            });
                        }
                    });
                }
            });
        }
        catch (error) {
            console.error("Error fetching tweets:", error);
            return [];
        }
        return tweets;
    });
}
