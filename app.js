const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const path = require('path');

// Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Twilio VoiceResponse
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// 生成したファイルを保存しておくフォルダ
app.use(express.static(path.join(__dirname, 'voice_files')));

// Twilioから着信リクエストを受け取るAPI
app.post('/incoming', async (req, res) => {
    // クライアントを初期化
    const client = new textToSpeech.TextToSpeechClient();

    // 音声合成するテキストを設定
    const text = 'お電話ありがとうございます。あなたの電話番号は、' +
        req.body.From + 'です。';

    // リクエストを作成
    const request = {
        input: {text: text},
        // 言語およびSSMLを設定
        voice: {languageCode: 'ja-JP', ssmlGender: 'FEMALE'},
        // 生成した音声のエンコーディングをmp3に設定
        audioConfig: {audioEncoding: 'MP3'},
    };

    // 音声合成を開始
    const [response] = await client.synthesizeSpeech(request);

    //現在のCallSidから出力ファイル名を生成
    let outputFileName = req.body.CallSid + '.mp3';

    // mp3ファイルを保存
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('voice_files/' + outputFileName, response.audioContent, 'binary');

    // TwiMLを初期化
    const twiml = new VoiceResponse();
    twiml.say({
        language: 'ja-JP',
        voice: 'Polly.Mizuki'
    }, "テストです。");
    // 生成した音声を再生させる。
    // ローカルホストで試す場合は、ngrok(https://ngrok.com/)などのツールを使用し、生成されたurlを指定してください。
    twiml.play('このプロジェクトをホストするドメイン名(https://example.com/' + outputFileName);

    //ヘッダ
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

app.post('/statuschanged', async(req, res) => {
    // 通話が完了した段階で該当ファイルを削除
    if (req.body.CallStatus === "completed")
    {
        var filePath = 'voice_files/' + req.body.CallSid + '.mp3';
        fs.exists(filePath, (result) =>{
            if (result)
            {
                fs.unlink(filePath, (err)=>{
                if (err) throw err;
                console.log(filePath + 'を削除しました。');
                });
            }
        });
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));