---
title: Firewall
---

The firewall is a security feature that allows you to restrict access to your API. 

## Login throttling
Login throttling is a security feature that allows you to restrict the number of login attempts within a given time frame. This is enabled by default and limited to 5 attempts per 15 minutes using the [SlidingWindowStrategy](/swift-docs/docs/security/ratelimiter#example-of-usage-in-middleware). 

Login Throttling can be configured in `etc/config/security.yaml`:

```yaml
firewalls:
  main: 
  login_throttling:
    # The number of login attempts allowed within 15 minutes using a sliding window strategy
    max_attempts: 5
```

Login throttling can not be disabled. If you want to disable login throttling (not recommended), just use a very high number of max attempts.

The lock will automatically be released after 15 minutes, or sooner if some tokens expire sooner. Each token will be released after 15 minutes.