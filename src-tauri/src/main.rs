// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



fn main() {
    let client = sentry_tauri::sentry::init((
       "https://3f21a7aa44de3535f51819c2ff5d1e49@o4507485980917760.ingest.de.sentry.io/4507669860057168",
        sentry_tauri::sentry::ClientOptions {
            release: sentry_tauri::sentry::release_name!(),
            ..Default::default()
        },
    ));

    // Everything before here runs in both app and crash reporter processes
    let _guard = sentry_tauri::minidump::init(&client);
    // Everything after here runs in only the app process

    tauri::Builder::default()
        .plugin(sentry_tauri::plugin())
        .run(tauri::generate_context!())
        .expect("error while running tauri app");
}
