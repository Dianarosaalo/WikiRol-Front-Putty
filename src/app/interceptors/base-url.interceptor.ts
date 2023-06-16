import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    url:`http://vps-5eb41e5a.vps.ovh.net:8080/${req.url}`
  });
  return next(reqClone);
};

