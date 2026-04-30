# 部署到 pku-ultra-running.com

当前网站是纯静态文件，但域名不会自动指向本地电脑。要让 `http://pku-ultra-running.com/` 或 `https://pku-ultra-running.com/` 显示页面，需要完成两件事：

1. 把本文件夹发布到一个静态托管平台。
2. 在域名服务商后台把 DNS 指向该托管平台。

下面是推荐的 GitHub Pages 方案。

## 1. 创建 GitHub 仓库

在 GitHub 新建一个仓库，例如：

```text
pku-ultra-running
```

然后在本目录执行：

```powershell
git init
git add .
git commit -m "Initial PKU ultra running website"
git branch -M main
git remote add origin https://github.com/<你的GitHub用户名>/pku-ultra-running.git
git push -u origin main
```

## 2. 开启 GitHub Pages

进入 GitHub 仓库：

```text
Settings -> Pages
```

设置：

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

保存后，GitHub 会先生成一个临时网址：

```text
https://<你的GitHub用户名>.github.io/pku-ultra-running/
```

等这个地址能打开后，再继续绑定自定义域名。

## 3. 绑定自定义域名

本项目根目录已经包含：

```text
CNAME
```

内容是：

```text
pku-ultra-running.com
```

在 GitHub Pages 的 `Custom domain` 中填写：

```text
pku-ultra-running.com
```

保存。

## 4. 配置 DNS

到你购买 `pku-ultra-running.com` 的域名服务商后台，进入 DNS 解析，添加以下记录。

根域名，也就是 `pku-ultra-running.com`：

```text
类型    主机记录    值
A       @           185.199.108.153
A       @           185.199.109.153
A       @           185.199.110.153
A       @           185.199.111.153
```

可选，但推荐同时添加 IPv6：

```text
类型    主机记录    值
AAAA    @           2606:50c0:8000::153
AAAA    @           2606:50c0:8001::153
AAAA    @           2606:50c0:8002::153
AAAA    @           2606:50c0:8003::153
```

如果也想让 `www.pku-ultra-running.com` 可访问：

```text
类型    主机记录    值
CNAME   www         <你的GitHub用户名>.github.io
```

## 5. 等待生效并开启 HTTPS

DNS 通常几分钟到数小时生效，少数情况下可能需要 24 小时。

回到 GitHub：

```text
Settings -> Pages
```

等待自定义域名校验通过，然后勾选：

```text
Enforce HTTPS
```

最终访问：

```text
https://pku-ultra-running.com/
```

## 6. 验证命令

DNS 生效后可执行：

```powershell
Resolve-DnsName pku-ultra-running.com
curl.exe -I https://pku-ultra-running.com/
```

如果 `Resolve-DnsName` 能看到 GitHub Pages 的 IP，且 `curl` 返回 `200` 或 `301/302`，说明域名链路已经通了。
