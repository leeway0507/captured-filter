from pipe.inference import ProductInference
from typing import List, Dict
from pipe.utils import load_raw_file
import os
import pytest
import dotenv

test_current_path = __file__.rsplit("/", 1)[0]
test_store = "quint"
test_file_name = "20240407_adidas.json"
threshold = 0.1


@pytest.fixture(scope="module")
def inference():
    yield ProductInference(threshold)


### start Test ###
def test_predict(inference: ProductInference):
    f = load_raw_file(test_store, "list", test_file_name)

    i = inference.predict(f[0])
    assert i.productId == "ig6194"


def test_predict_and_merge(inference: ProductInference):
    f = load_raw_file(test_store, "list", test_file_name)
    p = inference.predict_and_merge(f[0])
    assert p.productId == "ig6194"


def test_batch_predict(inference: ProductInference):
    f = load_raw_file(test_store, "list", test_file_name)
    p = inference.batch_predict(f)
    assert len(p) == 52


def test_exec(inference: ProductInference):
    default_path = os.path.join(test_current_path, "data", "inference")
    inference.exec(test_store, "list", test_file_name, default_path)
    test_path = os.path.join(default_path, test_store, "list", test_file_name)
    print(test_path)
    assert os.path.exists(test_path)
