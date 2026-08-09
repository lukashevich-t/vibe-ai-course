## Начало проекта
- убедиться, что установлен node version manager (nvm) и в нем по умолчанию выбран node v20+
- Создать новый проект в Cursor в папке 'vibe-ai-course'
- Папка проекта должна находиться на файловой системе с поддержкой симлинков (NTFS, EXT4...)
- в редакторе cursor открыть терминал, нажать Ctrl+K для вызова мини-промпта и написать "`Create an next js application written in typescript. place it in subfolder `vibe-course`. Add app router to it. Use eslint. Use tailwind css. Don't use src directory. Don't customize import alias`". 
- AI создаст команду и вставит ее в окно терминала. Надо чуток ее подправить, добавив имя подпапки, в которой создать проект:
```bash
npx create-next-app@latest vibe-course --use-npm --src-dir --app
```

## Создание дизайна с помощью ИИ
- для дизайна идём на https://v0.dev (https://v0.app) и вводим примерно такой промпт.
```
Build a dashboard for a link shortening and tracking application. It should be built in dark mode, and split into two main sections: the sidebar and the main portion of the dashboard.

The sidebar, from top to bottom should have:
- Account management, with their name, email and profile picture
- Link integrations line item
- A line divider
- A home link with icon
- An analytics link with icon
- A customers link with icon
- A line divider
- A partners link with icon, and 'new' text next to it
- A payouts link with icon
At the bottom
- Settings link with icon
- Help center link with icon

A main dashboard, from top to bottom:
- 'Links' text at the top, with a drop down
- create link button, far right
- line
- 'display' and 'bulk actions' buttons with outlines
- search bar far right
- link cards the rest of the way down


Link card layout (should be long and thin):
- Favicon of link on the left side
- shortened link beside favicon, at the top, with copy symbol beside that
- Actual link below (and beside favicon), with time it was made beside
- description in the middle of the long card
- amount of clicks on far right side of card, with mouse icon and green dot to indicate it's alive
```

Примечания для промта:
- Его надо составлять как можно детальнее, чтобы ИИ ничего не нафантазировал.
- Лучше обозначить какой-то компонент, что он находится в какой-то области, а потом ниже отдельным списком описать, из чего состоит компонент. Тогда Vercel скорее всего оформит компонент именно как отдельный компонент react, что облегчит нам жизнь. Так сделано выше для Link card.

- допустим, надо что-то поменять в сгенерированном сайте. Тогда пишем такой примерно промпт. Опять же, все изменения группируем по компонентам:
```
Please make following changes:

Sidebar:
- Remove section with text "Shortlist" at the top
- background color should be: #101011
- the 'new' chip should have a background of color #1c2b1c
- the 'new' chip should have a text color of #04c40a
- the profile image should have rounded but not circular corners

Dashboard:
- There should be no header above link cards
- Background color should be #090909
- There should be no background color for any cards or containers on the main dashboard
- Instead there should be a border of 1px #2e2e2e
- The create link button should have a background of #1f1f1f
- Add button for toggle sidebar to main dashboard next to 'Links' button 

Link cards:
- Should consist of three "columns":
  - leftmost column contains favicon for link
  - to the right of favicon, there should be section with 3 lines:
    - shortened link with copy icon beside it
    - actual link with creation date beside it
    - description of link
  - rightmost column shows mouse icon, click counter and green dot indicator of link liveness
- Should have no background color
- Should have border of 1px #2e2e2e
- Remove title of the link, should only be shortened link, and the regular link
```

```
Make changes:
Sidebar:

- account name color should be 'white'
- current link backkground color should be 'grey'
- active link backkground color should be 'lightgrey'
```

```
main part:
- Text 'Links' should be white
- foreground of button "Create link" should be white
- foreground of button "Bulk actions" should be white
- Foreground for text "Display" should be light grey
```


```
make change for main part:
- "hide sidebar" button should actually hide sidebar
```

```
change link card:
- foreground for shortened link should be 'light blue'
- foreground for click counter should be 'magenta'
```

- Когда удовлетворились результатом,  стираем то, что создал ранее Cursor, скачиваем с v0.app исходники в zip-файле, и распаковываем в ту же папку.
- запускаем `npm install`

## Доработка интерфейса
- Дизайним страничку добавления новой ссылки
- открываем наш проект на v0.app и просим доработать:
```
Each of the link cards has its own page when clicked on. Here is the page layout:

Sidebar: Identical to how it looks now

Dashboard top bar:
- Breadcrumbs that say 'Links > [shortened link]'
- Copy link button, far right
- 3 dots 'more' button, far right

Dashboard Main:
- 'Destination URL' with ? icon, input below with 'https://example.com/subdomain-here' filler text
- 'Short link' with refresh icon to the far right. input below with a dropdown on the left with 'links.sh' filled in, and 'pOg8x1e' filled in on the right side
- 'Tags' with ? icon. Input below with tag icon on left side. Filler text: 'Select tags'.
- 'Conversion tracking' with ? icon. Toggle switch to the right
- Line divider
- 'Folder' with ? icon. Dropdown below with #1cb21c icon background and #04c40a icon. 'Links' filled in with dropdown arrow far right
- 'Description' with description box. Filler text: 'Add a short description here...'
- 'UTM' chip, 'Targeting' chip, 'Expiration' chip and 'Password' chip side by side, with icons.
- Line divider
- 'Created by adamsmith@gmail.com', with date beside
```