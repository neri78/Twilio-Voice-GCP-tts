# Twilio-Voice-GCP-tts

Twilio Programmable VoiceとGoogle Cloud Text to Speech APIを利用するためのサンプルです。

## 実行方法

あらかじめGoogle Clould Text-to-Speechを使える状態にする必要があります。下記を参考にセットアップをします。

[クイックスタート: クライアント ライブラリの使用](https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries?hl=ja)

パッケージのインストールを行います。
```
npm install
```

ターミナル、コマンドプロンプトを開き、事前にダウンロードしたGoogle Cloud Text to Speech APIを使用する際に必要な情報が保存されているサービスアカウントのファイルパスを<code>GOOGLE_APPLICATION_CREDENTIALS</code>という変数名で通しておきます。

__Macの場合__
```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

__Windowsの場合__
```
set GOOGLE_APPLICATION_CREDENTIALS=[PATH]
```

なお、ターミナル、コマンドプロンプトを閉じてしまうと、再度パスを通す必要があります。

アプリケーションを外部からアクセスできるドメインでホスティングする場合は、<code>app.js</code>のtwiml.playで指定しているUrlをホストしているドメインに変更します。

__https://example.comにホストする場合__
```
twiml.play('https://example.com/' + outputFileName);
```

サンプルをローカルホストで実行する場合は、ローカルホストのポート3000番に外部からアクセスできるようにします。
その場合は、[ngrok](https://ngrok.com/)などのツールが利用できます。
ngrokをインストール後、別のターミナルを開き、下記のコマンドを実行します。
```
ngrok http 3000
```
<img src="https://cdn-ssl-devio-img.classmethod.jp/wp-content/uploads/2019/12/Screen-Shot-2019-12-17-at-14.40.34-640x369.png" alt="ngrok" width="640" height="369" class="size-medium wp-image-515869" />

この例では<code>https://2c2a973d.ngrok.io</code>が表示されるため、twiml.playのurlを次のように設定します。

__ngrokを利用する場合__
```
twiml.play('https://2c2a973d.ngrok.io/' + outputFileName);
```

最後にapp.jsを起動します。
```
node app.js
```

## 参考情報

[TwilioにGoogle Could Text-to-Speechで話してもらうには？（Node.js）](https://dev.classmethod.jp/etc/twilio-voice-gcp-tts/)  

[Twilio 101 HandsOn JP](https://github.com/neri78/Twilio-HandsOn-101-JP)