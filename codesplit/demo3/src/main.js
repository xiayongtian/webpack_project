import sum from "./math"
// import count from "./conut"
console.log('main')
console.log(sum(1, 2, 3))

document.getElementById("btn").onclick = function () {
    // 动态导入 --> 实现按需加载
    // 即使只被引用了一次，也会代码分割
    import("./count").then((res) => {
        console.log('count')
    });
};

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("SW registered: ", registration);
            })
            .catch((registrationError) => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}

