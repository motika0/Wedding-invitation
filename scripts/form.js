  const scriptURL = "https://script.google.com/macros/s/AKfycbxCt63DiqJcbgrADZPXaMy2UA7u8Ew4vr74iDzn6D8UzMBX6sgaIpI9eVpMnlQilqbe/exec";
 const form = document.getElementById("wedding-form");
  const status = document.getElementById("status");
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("name-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // очистка
    nameError.innerText = "";
    status.innerText = "";

    // 1️⃣ ПРОВЕРКА
    if (nameInput.value.trim() === "") {
      nameError.innerText = "Пожалуйста, заполните имя и фамилию";
      nameInput.style.borderBottom = "1px solid #c40000";
      return; // 🚨 ОСТАНОВКА — ничего не отправляем
    }

    nameInput.style.borderBottom = "1px solid #2e2e2e";

    // 2️⃣ Только теперь пишем "Отправляем"
    status.innerText = "Отправляем...";
    status.style.color = "#2e2e2e";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      status.innerText = "Спасибо! Мы вас зарегистрировали 💍";

      form.reset();
      form.querySelector('input[value="Да, с удовольствием"]').checked = true;

    } catch (error) {
      status.innerText = "Ошибка отправки 😢";
      status.style.color = "#c40000";
    }
  });
