var g_calendar = null;

//本日、カレンダーの開始日、終了日と、曜日のテキストを用意します
var date_now = new Date();
var date_start = new Date(date_now.getFullYear(), date_now.getMonth(), 1);
var date_end = new Date(date_now.getFullYear(), date_now.getMonth(), 1);
date_end.setMonth(date_end.getMonth()+12);

function createCalendar()
{
    return new FullCalendar.Calendar(document.getElementById("calendar"), {
        // プラグインを読み込みます
        plugins: ["dayGrid", 'interaction', 'timeGrid', 'list'],

        // ヘッダー内の配置を、左に前月ボタン、中央にタイトル、右に次月ボタンに設定します
        header: {
            left: "prev",
            center: "title",
            right:" next"
        },

        // ボタンのテキストを書き換えます
        buttonText: {
            prev: "前の月",
            next: "次の月"
        },

        // デフォルト日を本日に設定します
        defaultDate: new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000)),
        timeZone: 'JST',

        // 有効期間を当月1日から12ヶ月後（1年後）に設定します。
        validRange: {
            start: date_start,
            end: date_end
        },

        // イベント情報をJSONファイルから読み込みます
        events: "events.json",

        dateClick: function(info) {
            $.ajax({
                type: 'GET',
                url: '/events/new',
                data: { time: moment(info.date).format() },
            }).done(function (res) {
            }).fail(function (result) {
                // 失敗処理
                alert('エラーが発生しました。運営に問い合わせてください。')
            });
        },
    });
}

function fullCalendar() {
    if (g_calendar == null) {
        g_calendar = createCalendar()
    }
    return g_calendar;
}
