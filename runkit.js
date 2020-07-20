// evaljs.snomiao.com
// [eval-js | RunKit]( https://runkit.com/snomiao/eval-js )
// https://eval-js-m2fznc17yf1n.runkit.sh/
// 
const express = require("@runkit/runkit/express-endpoint/1.0.0");
const app = express(exports);

const requireAuto = require("require-auto");
const Nodejs求值 = (code) => {
   try{
        {
            let require = requireAuto
            return JSON.stringify(eval(code))
        }
   }catch(错){return 错.toString()}
}

const 在线求值 = async (code) => await fetch('/eval?code='+encodeURIComponent(code)).then(e=>e.text())
const 前端 = async (code) => `
<script>const evalthis = () => {
    document.querySelector('#out').innerText='pending...';
    (${在线求值})(document.querySelector('#code').value).then(out=>document.querySelector('#out').innerText=out);
};</script>
v2020.07.20
<form action="javascript:" >
<textarea id="code" name="code"
onchange="evalthis()"
>${escape(code||'')||"require('md5')('snomiao')"}</textarea>
<span id="out"></span>
<button type="submit" onclick="evalthis()" >done</button>
</form>
`;

app.get("/eval", async (req, res) => res.send(await Nodejs求值(req.query.code)))
app.get("/", async (req, res) => res.send(await 前端(req.query.code)))
