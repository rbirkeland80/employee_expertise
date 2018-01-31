import '../polyfills';

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { CoreModuleNgFactory } from './core.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(CoreModuleNgFactory);