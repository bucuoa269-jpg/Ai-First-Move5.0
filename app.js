name: 提交一条 AI 机会线索
description: 提交比赛、黑客松、副业案例、招聘、访谈或平台活动。线索不会自动升级为已核验事实。
title: "[机会] "
labels: ["机会", "待核验"]
body:
  - type: dropdown
    id: type
    attributes:
      label: 机会类型
      options: [黑客松/比赛, 副业案例, 创业机会, 招聘/实习, 深度访谈, 平台活动, 其他]
    validations:
      required: true
  - type: input
    id: source
    attributes:
      label: 原始链接
      description: 优先填写主办方、企业、高校、政府或平台官方页面。
    validations:
      required: true
  - type: input
    id: published
    attributes:
      label: 发布时间或截止时间
      placeholder: "例如：发布 2026-06-18；截止 2026-07-01"
  - type: textarea
    id: summary
    attributes:
      label: 这条机会为什么值得关注？
      description: 请区分你看到的事实、你的推断和收入自述。
    validations:
      required: true
  - type: textarea
    id: confirmation
    attributes:
      label: 其他确认来源
      description: 可填写第二个独立来源；没有就写“暂无”。
  - type: checkboxes
    id: rights
    attributes:
      label: 版权与真实性
      options:
        - label: 我没有复制付费内容或完整文章，只提交公开链接和自己的摘要。
          required: true
        - label: 我理解提交后仍需编辑复核，不能视作收益保证。
          required: true
