// @ts-expect-error No typings.
import rgba from "color-rgba";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components/macro";

import { useEffect } from "preact/hooks";

import { useApplicationState } from "../mobx/State";

export type Variables =
    | "accent"
    | "background"
    | "foreground"
    | "block"
    | "message-box"
    | "mention"
    | "success"
    | "warning"
    | "error"
    | "hover"
    | "scrollbar-thumb"
    | "scrollbar-track"
    | "primary-background"
    | "primary-header"
    | "secondary-background"
    | "secondary-foreground"
    | "secondary-header"
    | "tertiary-background"
    | "tertiary-foreground"
    | "tooltip"
    | "status-online"
    | "status-away"
    | "status-focus"
    | "status-busy"
    | "status-streaming"
    | "status-invisible";

// While this isn't used, it'd be good to keep this up to date as a reference or for future use
export type HiddenVariables =
    | "font"
    | "ligatures"
    | "app-height"
    | "sidebar-active"
    | "monospace-font";

export type Fonts =
    | "Open Sans"
    | "OpenDyslexic"
    | "Inter"
    | "Atkinson Hyperlegible"
    | "Roboto"
    | "Noto Sans"
    | "Lato"
    | "Bitter"
    | "Montserrat"
    | "Poppins"
    | "Raleway"
    | "Ubuntu"
    | "Comic Neue"
    | "Lexend";

export type MonospaceFonts =
    | "Fira Code"
    | "Roboto Mono"
    | "Source Code Pro"
    | "Space Mono"
    | "Ubuntu Mono"
    | "JetBrains Mono";

export type Overrides = {
    [variable in Variables]: string;
};

export type Theme = Overrides & {
    light?: boolean;
    font?: Fonts;
    css?: string;
    monospaceFont?: MonospaceFonts;
    "min-opacity"?: number;
};

export type ComputedVariables = Theme & {
    "header-height"?: string;
    "effective-bottom-offset"?: string;
};

export interface ThemeOptions {
    base?: string;
    ligatures?: boolean;
    custom?: Partial<Theme>;
}

export const FONTS: Record<Fonts, { name: string; load: () => void }> = {
    "Open Sans": {
        name: "Open Sans",
        load: async () => {
            await import("@fontsource/open-sans/300.css");
            await import("@fontsource/open-sans/400.css");
            await import("@fontsource/open-sans/500.css");
            await import("@fontsource/open-sans/600.css");
            await import("@fontsource/open-sans/700.css");
            await import("@fontsource/open-sans/400-italic.css");
        },
    },

    OpenDyslexic: {
        name: "OpenDyslexic",
        load: async () => {
            await import("@fontsource/opendyslexic/400.css");
            await import("@fontsource/opendyslexic/700.css");
            await import("@fontsource/opendyslexic/400-italic.css");
        },
    },

    Inter: {
        name: "Inter",
        load: async () => {
            await import("@fontsource/inter/300.css");
            await import("@fontsource/inter/400.css");
            await import("@fontsource/inter/600.css");
            await import("@fontsource/inter/700.css");
        },
    },
    "Atkinson Hyperlegible": {
        name: "Atkinson Hyperlegible",
        load: async () => {
            await import("@fontsource/atkinson-hyperlegible/400.css");
            await import("@fontsource/atkinson-hyperlegible/700.css");
            await import("@fontsource/atkinson-hyperlegible/400-italic.css");
        },
    },
    Roboto: {
        name: "Roboto",
        load: async () => {
            await import("@fontsource/roboto/400.css");
            await import("@fontsource/roboto/700.css");
            await import("@fontsource/roboto/400-italic.css");
        },
    },
    "Noto Sans": {
        name: "Noto Sans",
        load: async () => {
            await import("@fontsource/noto-sans/400.css");
            await import("@fontsource/noto-sans/700.css");
            await import("@fontsource/noto-sans/400-italic.css");
        },
    },
    Bitter: {
        name: "Bitter",
        load: async () => {
            await import("@fontsource/bitter/300.css");
            await import("@fontsource/bitter/400.css");
            await import("@fontsource/bitter/600.css");
            await import("@fontsource/bitter/700.css");
        },
    },
    Lato: {
        name: "Lato",
        load: async () => {
            await import("@fontsource/lato/300.css");
            await import("@fontsource/lato/400.css");
            await import("@fontsource/lato/700.css");
            await import("@fontsource/lato/400-italic.css");
        },
    },
    Lexend: {
        name: "Lexend",
        load: async () => {
            await import("@fontsource/lexend/300.css");
            await import("@fontsource/lexend/400.css");
            await import("@fontsource/lexend/700.css");
        },
    },
    Montserrat: {
        name: "Montserrat",
        load: async () => {
            await import("@fontsource/montserrat/300.css");
            await import("@fontsource/montserrat/400.css");
            await import("@fontsource/montserrat/600.css");
            await import("@fontsource/montserrat/700.css");
            await import("@fontsource/montserrat/400-italic.css");
        },
    },
    Poppins: {
        name: "Poppins",
        load: async () => {
            await import("@fontsource/poppins/300.css");
            await import("@fontsource/poppins/400.css");
            await import("@fontsource/poppins/600.css");
            await import("@fontsource/poppins/700.css");
            await import("@fontsource/poppins/400-italic.css");
        },
    },
    Raleway: {
        name: "Raleway",
        load: async () => {
            await import("@fontsource/raleway/300.css");
            await import("@fontsource/raleway/400.css");
            await import("@fontsource/raleway/600.css");
            await import("@fontsource/raleway/700.css");
            await import("@fontsource/raleway/400-italic.css");
        },
    },
    Ubuntu: {
        name: "Ubuntu",
        load: async () => {
            await import("@fontsource/ubuntu/300.css");
            await import("@fontsource/ubuntu/400.css");
            await import("@fontsource/ubuntu/500.css");
            await import("@fontsource/ubuntu/700.css");
            await import("@fontsource/ubuntu/400-italic.css");
        },
    },
    "Comic Neue": {
        name: "Comic Neue",
        load: async () => {
            await import("@fontsource/comic-neue/300.css");
            await import("@fontsource/comic-neue/400.css");
            await import("@fontsource/comic-neue/700.css");
            await import("@fontsource/comic-neue/400-italic.css");
        },
    },
};

export const MONOSPACE_FONTS: Record<
    MonospaceFonts,
    { name: string; load: () => void }
> = {
    "Fira Code": {
        name: "Fira Code",
        load: () => import("@fontsource/fira-code/400.css"),
    },
    "Roboto Mono": {
        name: "Roboto Mono",
        load: () => import("@fontsource/roboto-mono/400.css"),
    },
    "Source Code Pro": {
        name: "Source Code Pro",
        load: () => import("@fontsource/source-code-pro/400.css"),
    },
    "Space Mono": {
        name: "Space Mono",
        load: () => import("@fontsource/space-mono/400.css"),
    },
    "Ubuntu Mono": {
        name: "Ubuntu Mono",
        load: () => import("@fontsource/ubuntu-mono/400.css"),
    },
    "JetBrains Mono": {
        name: "JetBrains Mono",
        load: () => import("@fontsource/jetbrains-mono/400.css"),
    },
};

export const FONT_KEYS = Object.keys(FONTS).sort();
export const MONOSPACE_FONT_KEYS = Object.keys(MONOSPACE_FONTS).sort();

export const DEFAULT_FONT = "Open Sans";
export const DEFAULT_MONO_FONT = "Fira Code";

// Generated from https://gitlab.insrt.uk/revolt/community/themes
export const PRESETS: Record<string, Theme> = {
    light: {
        accent: "#5865F2",
        background: "#F6F6F6",
        foreground: "#fff",
        block: "#2B2D31",
        "message-box": "#F1F1F1",
        mention: "rgba(251, 255, 0, 0.40)",
        success: "#23A55A",
        warning: "#F0B132",
        tooltip: "#FFF",
        error: "#DA373C",
        hover: "#2E3035",
        "scrollbar-thumb": "#1A1B1E",
        "scrollbar-track": "#2B2D31",
        "primary-background": "#313338",
        "primary-header": "#313338",
        "secondary-background": "#2B2D31",
        "secondary-foreground": "#dbdee1",
        "secondary-header": "#3F4147",
        "tertiary-background": "#4f4f4f",
        "tertiary-foreground": "#8e8f90",
        "status-online": "#23A55A",
        "status-away": "#F0B232",
        "status-focus": "#4799F0",
        "status-busy": "#F23F43",
        "status-streaming": "#593695",
        "status-invisible": "#80848E",
    },
    dark: {
        accent: "#5865F2",
        background: "#1E1F22",
        foreground: "#fff",
        block: "#2B2D31",
        "message-box": "#313338",
        mention: "rgba(251, 255, 0, 0.06)",
        success: "#23A55A",
        warning: "#F0B132",
        tooltip: "#000000",
        error: "#DA373C",
        hover: "#2E3035",
        "scrollbar-thumb": "#1A1B1E",
        "scrollbar-track": "#2B2D31",
        "primary-background": "#313338",
        "primary-header": "#313338",
        "secondary-background": "#2B2D31",
        "secondary-foreground": "#dbdee1",
        "secondary-header": "#3F4147",
        "tertiary-background": "#4f4f4f",
        "tertiary-foreground": "#8e8f90",
        "status-online": "#23A55A",
        "status-away": "#F0B232",
        "status-focus": "#4799F0",
        "status-busy": "#F23F43",
        "status-streaming": "#593695",
        "status-invisible": "#80848E",
    },
};

const GlobalTheme = createGlobalStyle<{ theme: Theme }>`
:root {
	${(props) => generateVariables(props.theme)}
}

${(props) =>
    props.theme["min-opacity"] === 1 &&
    `
        * {
            backdrop-filter: unset !important;
        }
    `}
`;

export const generateVariables = (theme: Theme) => {
    return (Object.keys(theme) as Variables[]).map((key) => {
        const colour = rgba(theme[key]);
        if (colour) {
            const [r, g, b] = colour;
            return `--${key}: ${theme[key]}; --${key}-rgb: ${r}, ${g}, ${b};`;
        }
        return `--${key}: ${theme[key]};`;
    });
};

export default observer(() => {
    const settings = useApplicationState().settings;
    const theme = settings.theme;

    const root = document.documentElement.style;
    useEffect(() => {
        const font = theme.getFont() ?? DEFAULT_FONT;
        root.setProperty("--font", `"${font}"`);
        try {
            FONTS[font]?.load();
        } catch (err) {
            console.error(`Failed to load font: ${font}`);
        }
    }, [root, theme.getFont()]);

    useEffect(() => {
        const font = theme.getMonospaceFont() ?? DEFAULT_MONO_FONT;
        root.setProperty("--monospace-font", `"${font}"`);
        try {
            MONOSPACE_FONTS[font]?.load();
        } catch (err) {
            console.error(`Failed to load monospace font: ${font}`);
        }
    }, [root, theme.getMonospaceFont()]);

    useEffect(() => {
        root.setProperty(
            "--ligatures",
            settings.get("appearance:ligatures") ? "normal" : "none",
        );
    }, [root, settings.get("appearance:ligatures")]);

    useEffect(() => {
        const resize = () =>
            root.setProperty("--app-height", `${window.innerHeight}px`);
        resize();

        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [root]);

    const variables = theme.computeVariables();
    return (
        <>
            <Helmet>
                <meta name="theme-color" content={variables["background"]} />
            </Helmet>
            <GlobalTheme theme={variables} />
            <style dangerouslySetInnerHTML={{ __html: theme.getCSS() ?? "" }} />
        </>
    );
});
