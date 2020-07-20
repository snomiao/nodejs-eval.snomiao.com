const express = require('express')
const PORT = process.env.PORT || 5000

const requireAuto = require("require-auto"); //don't supports windows
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

app = express()

app.get("/eval", async (req, res) => res.send(await Nodejs求值(req.query.code)))
app.get("/", async (req, res) => res.send(await 前端(req.query.code)))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
