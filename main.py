import re
from datetime import datetime

import requests
from bs4 import BeautifulSoup


def extract_number_id(input_string):
    match = re.search(r'\d+', input_string)

    return match.group() if match else None
    
with open("templates/menu.html", "r") as f:
    menu_html = f.read()

current_date = datetime.now().strftime("%m/%d")
url = "https://www.nutritics.com/menu/ma1135"

response = requests.get(url)

# Step 2: Parse the HTML document with BeautifulSoup
soup = BeautifulSoup(response.content, 'html.parser')

# Step 3: Search for the div that contains the current date within the span tag
menu_div = None
for div in soup.find_all("div", class_='menu'):
    span = div.find("span", class_='title')
    if span and current_date in span.text:
        menu_div = div
        break

# Step 4: Extract the id attribute if the div is found
menu_id = None
if menu_div:
    menu_id = menu_div.get("id")
    menu_id = extract_number_id(menu_id)
    print(f"Menu ID: {menu_id}")
else:
    with open("index.html", "w") as f:
        f.write(menu_html.replace("[title]", "No Lunch Items Today")
                .replace("[mode]", "no-menu").replace("[main]", "").replace("[other]", ""))
    exit()

url = "https://www.nutritics.com/menu/ma1135/" + menu_id  # Replace with the actual URL
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
results_div = soup.find('div', id='results')
child_divs = results_div.find_all('div', recursive=False)

main_menu_items = []
other_items = []
for item in child_divs:
    if item.get("data-groupname") == "Main Plate":
        main_menu_items.append(item.get("data-name"))
    else:
        other_items.append(item.get("data-name"))


main_menu_html = [f'<div class="table-row">{key}</div>' for key in main_menu_items]
other_items_html = [f'<div class="table-row">{key}</div>' for key in other_items]

with open("index.html", "w") as f:
    html_file = (menu_html.replace("[title]", "Lunch Items Today")
                 .replace("[mode]", "menu").replace("[main]", '\n'.join(main_menu_html)))
    html_file = html_file.replace("[other]", '\n'.join(other_items_html))
    f.write(html_file)

