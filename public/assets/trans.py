import csv
import json

# CSV文件路径
csv_file = 'F:/课程文件/交互设计/tvcg/public/assets/song/Song_author.csv'
# JSON文件路径
json_file = 'F:/课程文件/交互设计/tvcg/public/assets/Song_link_author-1.json'

# 创建空列表
matrix_list = []

# 打开CSV文件
with open(csv_file, 'r') as file:
    # 创建CSV读取器
    csv_reader = csv.reader(file)

    # 逐行读取CSV文件内容
    for row in csv_reader:
        # 提取x和y的值
        x = int(row[0])
        y = int(row[1])

        # 创建字典并添加到列表中
        if ( x < y ):
            data = {"source": x - 1, "target": y - 1, "lineStyle": { "color": "rgb(255, 110, 0)", "opacity": 0.3}}
            matrix_list.append(data)

# 将结果写入JSON文件
with open(json_file, 'w') as file:
    json.dump(matrix_list, file)
