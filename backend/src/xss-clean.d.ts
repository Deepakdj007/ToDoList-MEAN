declare module 'xss-clean' {
    import { RequestHandler } from 'express';
  
    function xssClean(options?: xssClean.Options): RequestHandler;
  
    namespace xssClean {
      interface Options {
        /* define the options interface here */
      }
    }
  
    export = xssClean;
  }
  