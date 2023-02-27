import logo from "./logo.svg"
import translate from "./images/GoogleTranslatelogo.svg.png"
import "./App.css"
import React, { useState, useEffect } from "react"
import { FormattedMessage, IntlProvider, FormattedDate } from "react-intl"

function App () {
  const [lang, setLang] = useState(navigator.language)
  // 網頁載入第一次render時因localeData無值，console會報錯
  const [localeData, setLocaleData] = useState(undefined)

  // fetch各語系的json data，注意當前路徑為public底下
  const fetchLangData = async (lang) => {
    const resp = await fetch(`./lang/${lang}.json`)
    const data = await resp.json()
    setLocaleData(data)
  }

  // 傳入lang變數至fetchLangData，預設值為en
  useEffect(() => {
    fetchLangData(lang)
  }, [lang])

  return (
    <IntlProvider locale={lang} key={lang} defaultLocale="en" messages={localeData}>
      {console.log("==Render==")}
      <div className="App">
        <header className="App-header">
          <div className="flex-center">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="translate-wrapper">
              <img src={translate} className="translate" alt="translate" />
            </div>
          </div>
          <div>
            <select
              value={lang}
              onChange={(evt) => {
                setLang(evt.target.value)
              }}
            >
              <option value="en">English</option>
              <option value="zh-TW">中文</option>
              <option value="fr">Français</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <p>
            {/* 將要翻譯的內容包在FormattedMessage內，id為各語系json資料內的key */}
            <FormattedMessage
              id="app.header"
              defaultMessage="Edit src/App.js and save to reload."
            />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* 將要翻譯的內容包在FormattedMessage內，id為各語系json資料內的key */}
            <FormattedMessage
              id="app.content"
              defaultMessage="Learn React"
            />
          </a>
          {/* 根據瀏覽器所在地變日期顯示方式，不確定此用法是否為最佳 */}
          <p>
            <FormattedDate
              value={new Date()}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            />
          </p>
        </header>
      </div>
    </IntlProvider>
  )
}

export default App