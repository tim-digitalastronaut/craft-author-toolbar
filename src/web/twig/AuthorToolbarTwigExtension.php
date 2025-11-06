<?php

namespace digitalastronaut\craftauthortoolbar\web\twig;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AuthorToolbarTwigExtension extends AbstractExtension {
    public function getFunctions(): array {
        return [
            new TwigFunction('getStaticTranslations', [$this, 'getStaticTranslations']),
        ];
    }

    public function getStaticTranslations() {
        $language = Craft::$app->language;

        $fallbacks = [];

        if ($language) {
            $fallbacks[] = $language;

            if (str_contains($language, '-')) {
                $langOnly = explode('-', $language)[0];

                if (!in_array($langOnly, $fallbacks, true)) $fallbacks[] = $langOnly;
            }
        }

        $fallbacks[] = 'en';

        foreach ($fallbacks as $lang) {
            $file = Craft::getAlias("@digitalastronaut/craftauthortoolbar/translations/{$lang}/author-toolbar.php");

            if (file_exists($file)) return require $file;
        }

        return [];
    }
}