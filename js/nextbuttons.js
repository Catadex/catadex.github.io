let nextEdit = document.querySelector("card.next .edit"),
    nextQR = document.querySelector("card.next .qr"),
    nextCopy = document.querySelector("card.next .copy"),
    nextOpen = document.querySelector("card.next .open"),
    QRbackdrop = document.querySelector("qr backdrop"),
    QRimg = document.querySelector("qr img");

nextEdit.addEventListener("click",function() {
    nextForm.parentNode.classList.add("hidden");
    loginForm.parentNode.classList.remove("hidden");
});

nextQR.addEventListener("click",function() {
    QRimg.src = "https://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=" + encodeURIComponent(linkBox.value);

    QRimg.parentNode.classList.remove("hidden");
});

QRbackdrop.addEventListener("click",function() {
    QRimg.parentNode.classList.add("hidden");

    QRimg.src = "/";
});

nextCopy.addEventListener("click",function() {
	linkBox.select();

	navigator.clipboard.writeText(linkBox.value).then(function() {
		nextCopy.classList.add("success");
	}, function() {
        nextCopy.classList.add("failure");
	});

    const glance = setTimeout(function() {
        nextCopy.classList.remove("success","failure");
    }, 800);
});

nextOpen.addEventListener("click",function() {
    window.location.assign(linkBox.value);
});