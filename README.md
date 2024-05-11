# To Do App

Giải thích các thư mục:

## Giới thiệu sơ qua về cấu trúc thư mục:

-`src`: Thư mục chứa mã nguồn.

-`src/assets`: Chứa các file chứa các images, icons, font.

-`src/components`: Chứa các file chứa các Component.

-`src/constants`: Chứa các file chứa các hằng số.

-`src/routes`: Chứa các file chứa các route.

-`src/navigation`: Chứa các file chứa các setup màng hình.

-`src/screens`: Chứa các file chứa các màng hình.

-`src/utils`: Chứa các file chứa các hàm tiện ích

## Câu lệnh để chạy dự án:

---

🥈Khởi tạo node_modules:
👉 `yarn`

---

🥈Chạy dự án trong môi trường dev:
👉 `yarn start`
👉 `yarn android`
👉 `yarn ios`

---

🥈Build dự án TypeScript sang JavaScript cho production:
👉 `yarn apk`
👉 `yarn aab`

🥈Kiểm tra lỗi ESLint / Prettier:
👉 `yarn lint`
👉 `npm run lint`

🥈Nếu bạn muốn ESLint tự động fix lỗi thì chạy câu lệnh sau:
👉 `npm run lint:fix`

🥈Tương tự với Prettier, ta có câu lệnh:
👉 `npm run prettier`

🥈và:
👉 `npm run prettier:fix`

#### 🥇Một số lưu ý:

Xem log bằng phần mềm Flipper.

Vì đây là dự án chạy với Typescript nên khi cài đặt bất cứ một thư viện này chúng ta nên xem thư viện đó có hỗ trợ TypeScript không nhé. Có một số thư viện ở npm hỗ trợ TypeScript sẵn, có một số thì chúng ta phải cài thêm bộ TypeScript của chúng qua @types/ten-thu-vien.

Ví dụ như express thì chúng ta cài như sau:
👉 `yarn add expo-image-picker`
👉 `yarn add -D @types/expo-image-picker`

Thank me later!!! 🤪
