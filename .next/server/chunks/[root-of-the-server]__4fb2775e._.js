module.exports = {

"[project]/.next-internal/server/app/api/users/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/users/data.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "users": (()=>users)
});
const users = [
    {
        email: 'mokia@gmail.com',
        university: 'กำแพงเพชร',
        firstName: 'มกรา',
        lastName: 'คม',
        major: 'โยธา',
        phone: '055-5555-555',
        expire: '23/05/2023'
    },
    {
        email: 'kumpea@gmail.com',
        university: 'กำแพงเพชร',
        firstName: 'กุมภา',
        lastName: 'พันธ์',
        major: 'ไฟฟ้ากำลัง',
        phone: '055-5555-555',
        expire: '06/06/2005'
    },
    {
        email: 'meena@gmail.com',
        university: 'กำแพงเพชร',
        firstName: 'มีนา',
        lastName: 'คม',
        major: 'เคมี',
        phone: '055-5555-555',
        expire: '07/07/2005'
    },
    {
        email: 'masa@gmail.com',
        university: 'กำแพงเพชร',
        firstName: 'เมษา',
        lastName: 'ยน',
        major: 'สิ่งแวดล้อม',
        phone: '055-5555-555',
        expire: '08/08/2005'
    }
];
}}),
"[project]/src/app/api/users/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$users$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/users/data.js [app-route] (ecmascript)");
;
async function GET() {
    return Response.json(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$users$2f$data$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4fb2775e._.js.map